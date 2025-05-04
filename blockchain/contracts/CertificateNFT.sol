// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CertificateNFT is ERC721, Ownable {
    uint256 private _tokenIds;
    mapping(uint256 => string) private _certificateURIs;
    mapping(uint256 => address) private _issuers;
    mapping(uint256 => string) private _courseNames;

    constructor() ERC721("SkillChain Certificate", "SCC") {}

    struct CertificateData {
        string uri;
        string courseName;
        address issuer;
        uint256 issueDate;
    }

    mapping(uint256 => CertificateData) private _certificateData;

    event CertificateMinted(
        uint256 indexed tokenId,
        address indexed recipient,
        string courseName,
        address issuer
    );

    function mintCertificate(
        address recipient,
        string memory uri,
        string memory courseName
    ) external onlyOwner returns (uint256) {
        _tokenIds++;
        uint256 newTokenId = _tokenIds;

        _mint(recipient, newTokenId);
        _certificateData[newTokenId] = CertificateData({
            uri: uri,
            courseName: courseName,
            issuer: msg.sender,
            issueDate: block.timestamp
        });

        emit CertificateMinted(newTokenId, recipient, courseName, msg.sender);
        return newTokenId;
    }

    function getCertificateData(uint256 tokenId)
        external
        view
        returns (
            string memory uri,
            string memory courseName,
            address issuer,
            uint256 issueDate
        )
    {
        require(_exists(tokenId), "Certificate does not exist");
        CertificateData memory data = _certificateData[tokenId];
        return (data.uri, data.courseName, data.issuer, data.issueDate);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        require(_exists(tokenId), "Certificate does not exist");
        return _certificateData[tokenId].uri;
    }
} 